import {prisma} from "@/prisma/client";
import {getDataGithub} from "@/lib/utils";

export interface ArticlesResponse {
    articles: IArticle[];
    total: number;
}
export interface IArticle {
    id: number;
    name: string;
    description: string;
    content: string;
    date: Date;
    categoryId: number;
    category?: {
        id: number;
        name: string;
    };
}

export const getArticles = async (
    skip: number = 0,
    take: number = 10,
    sortBy: string = "date",
    sortOrder: string = "desc",
    categoryId?: number
): Promise<ArticlesResponse> => {
    try {
        // Validation des paramètres de tri
        const validSortFields = ["date", "name", "categoryId"];
        const validSortOrders = ["asc", "desc"];

        const orderByField = validSortFields.includes(sortBy) ? sortBy : "date";
        const orderByDirection = validSortOrders.includes(sortOrder) ? sortOrder : "desc";

        // Construction de l'objet orderBy pour Prisma
        const orderBy = {
            [orderByField]: orderByDirection
        };

        // Construction du filtre where
        const where: any = {};
        if (categoryId && categoryId > 0) {
            where.categoryId = categoryId;
        }

        // Exécution parallèle des requêtes pour optimiser les performances
        const [articles, total] = await Promise.all([
            prisma.article.findMany({
                where,
                orderBy,
                skip,
                take,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    content: true,
                    date: true,
                    categoryId: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            }),
            prisma.article.count({ where }) // Compte total avec filtre pour la pagination
        ]);

        return {
            articles,
            total
        };
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw new Error("Failed to fetch articles");
    }
};

export const getAllArticleByCategory = async (categoryId: number): Promise<IArticle[]> => {
    return prisma.article.findMany({
        where: {
            categoryId: categoryId
        }
    });
}

export const getArticleById = async (id: number): Promise<IArticle | null> => {
    return prisma.article.findFirstOrThrow({
        where: {
            id: id
        }
    });
}

export const getArticlesBySubject = async (subject: string): Promise<IArticle[]> => {
    return prisma.article.findMany({
        where: {
            description: {contains: subject}
        }
    });
}

export const getAllArticlesFromGithub = async (): Promise<Omit<IArticle, "id" | "createdAt" | "updatedAt" | "category">[]> => {
    let articles: Omit<IArticle, "id" | "createdAt" | "updatedAt" | "category">[] = [];

    try {
        // 1. Récupérer la structure du repository
        const treeData = await getDataGithub("https://api.github.com/repos/Enstso/articles/git/trees/0ac21111ab29c01d564d65cdae81459380906445?recursive=1");

        if (treeData.status === "403") {
            console.warn("GitHub API rate limit exceeded, using cached data");
            return articles; // ou retourner des données en cache
        }

        // 2. Filtrer uniquement les fichiers .md (blobs)
        const markdownFiles = treeData.tree.filter((item: any) =>
            item.type === 'blob' && item.path.endsWith('.md')
        );

        console.log(`Found ${markdownFiles.length} markdown files to process`);

        // 3. Traiter chaque fichier en parallèle
        const articlePromises = markdownFiles.map(async (file: any) => {
            try {
                // Récupérer le contenu du fichier via l'API GitHub
                const blobData = await getDataGithub(file.url);

                if (!blobData.content) {
                    console.warn(`No content found for ${file.path}`);
                    return null;
                }

                // Décoder le contenu base64 et nettoyer les \n
                let decodedContent = '';
                try {
                    // Nettoyer le contenu base64 (enlever les \n)
                    const cleanBase64 = blobData.content.replace(/\n/g, '');
                    decodedContent = Buffer.from(cleanBase64, 'base64').toString('utf-8');
                } catch (decodeError) {
                    console.error(`Error decoding base64 for ${file.path}:`, decodeError);
                    return null;
                }

                // Extraire les métadonnées du contenu
                const metadata = extractMetadata(decodedContent);

                if (!metadata.category || !metadata.description || !metadata.date) {
                    console.warn(`Missing required metadata for ${file.path}`);
                    return null;
                }

                // Extraire le contenu principal (après les métadonnées)
                const content = extractContent(decodedContent);

                return {
                    name: file.path.replace('.md', ''), // Enlever l'extension
                    description: metadata.description,
                    content: content,
                    date: new Date(metadata.date),
                    categoryId: parseInt(metadata.category),
                }  as IArticle;

            } catch (error) {
                console.error(`Error processing article ${file.path}:`, error);
                return null;
            }
        });

        // 4. Attendre que tous les articles soient traités
        const resolvedArticles = await Promise.all(articlePromises);
        articles = resolvedArticles.filter((article): article is Omit<IArticle, 'id' | 'createdAt' | 'updatedAt' | 'category'> => article !== null);

        console.log(`Successfully processed ${articles.length} articles`);

        // 5. Sauvegarder en base de données
        if (articles.length > 0) {
            await saveArticlesToDb(articles);
        }

    } catch (error) {
        console.error("Error fetching GitHub articles:", error);
    }

    return articles;
};

// Fonction utilitaire pour extraire les métadonnées
const extractMetadata = (content: string): { category?: string, description?: string, date?: string } => {
    const metadata: { category?: string, description?: string, date?: string } = {};

    // Rechercher les métadonnées avec des regex
    const categoryMatch = RegExp(/categorie=(\d+)/).exec(content);
    const descriptionMatch = RegExp(/description=(.+?)(?=\n|$)/).exec(content);
    const dateMatch = RegExp(/date=(.+?)(?=\n|$)/).exec(content);

    if (categoryMatch) metadata.category = categoryMatch[1];
    if (descriptionMatch) metadata.description = descriptionMatch[1].trim();
    if (dateMatch) metadata.date = dateMatch[1].trim();

    return metadata;
};

// Fonction utilitaire pour extraire le contenu principal
const extractContent = (rawContent: string): string => {
    // Diviser le contenu par lignes
    const lines = rawContent.split('\n');

    // Trouver l'index où finissent les métadonnées
    let contentStartIndex = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('categorie=') || line.startsWith('description=') || line.startsWith('date=')) {
            contentStartIndex = Math.max(contentStartIndex, i + 1);
        }
    }

    // Retourner le contenu après les métadonnées
    return lines.slice(contentStartIndex).join('\n').trim();
};

// Fonction pour sauvegarder les articles en base de données
const saveArticlesToDb = async (articles: Omit<IArticle, 'id' | 'createdAt' | 'updatedAt' | 'category'>[]): Promise<void> => {
    try {
        for (const article of articles) {
            // Vérifier si l'article existe déjà
            const existingArticle = await prisma.article.findUnique({
                where: { name: article.name }
            });

            if (existingArticle) {
                // Mettre à jour l'article existant
                await prisma.article.update({
                    where: { name: article.name },
                    data: {
                        description: article.description,
                        content: article.content,
                        date: article.date,
                        categoryId: article.categoryId,
                    }
                });
                console.log(`Updated article: ${article.name}`);
            } else {
                // Créer un nouvel article
                await prisma.article.create({
                    data:{
                        name:article.name,
                        description: article.description,
                        content: article.content,
                        categoryId: article.categoryId,
                        date: article.date
                    }
                });
                console.log(`Created article: ${article.name}`);
            }
        }
    } catch (error) {
        console.error("Error saving articles to database:", error);
        throw error;
    }
};


