export class Api {
    public static getEndPoint(value: string) {
        //let base = 'http://local.api.intranet2.freshleafmedia.co.uk/api/v1/';
        let base = 'http://192.168.1.150/api.intranet2.freshleafmedia.co.uk/public/api/v1/';
        var data = {
            'projects': 'projects'
        };
        return base + data[value];
    }
}
