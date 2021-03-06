export class Register {
    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;

    constructor(format: string, text: string) {
        this.format = format;
        this.text = text;

        this.created = new Date();

        this.getType();
    }

    private getType() {
        const text = this.text.substring(0, 4);

        switch (text) {
            case 'http':
                this.type = 'http';
                this.icon = 'globe';
                break;

            case 'geo:':
                this.type = 'geo';
                this.icon = 'pin';
                break;

            default:
                this.type = 'No reconocido';
                this.icon = 'create';
                break;
        }
    }
}