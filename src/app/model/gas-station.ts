export class GasStation {
    constructor(public title: string, public description: string, public brand: string, public date: Date | string,
                public price: number, public trading_name: string, public location: number, public address: string,
                public phone: string, public latitude: string, public longitude: string,
                public site_features: string) {
    }
}
