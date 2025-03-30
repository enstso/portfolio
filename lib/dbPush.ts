// utils/dbPush.ts
import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const flagFile = path.resolve('./db-push-executed.flag'); // Fichier flag pour marquer l'exécution

export async function executeDbPush() {
  try {
    // Vérifier si le fichier flag existe
    await fs.access(flagFile);
    console.log('La commande a déjà été exécutée, rien ne se passe.');
  } catch (error) {
    // Si le fichier n'existe pas, c'est la première exécution
    console.log('Exécution de npx prisma db push...');

    try {
      // Exécuter la commande Prisma pour synchroniser la base de données
      await execPromise('npx prisma db push');
      
      // Créer le fichier flag pour marquer l'exécution
      await fs.writeFile(flagFile, 'done');
      console.log('Base de données synchronisée et la commande a été exécutée.');
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la commande Prisma:', error);
    }
  }
}
