export class Factory<T> {
    // Le constructeur de type pour T
    private type: new (...args: any[]) => T;

    // Injecter le type lors de la création de la factory
    constructor(type: new (...args: any[]) => T) {
        this.type = type;
    }

    // Méthode pour créer une instance de T
    create(...args: ConstructorParameters<typeof this.type>): T {
        return new this.type(...args);
    }
}
