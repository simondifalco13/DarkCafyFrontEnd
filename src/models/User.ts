//separate face API dat from normal data from Azure Communication data
export class User{
    id : string;
    tagId: string;
    tagName:string;
    firstname:string;
    lastname:string;
    mail:string;
    favouriteCoffee: string;
    password: string;
    pictures:string[];
    userId : string;
    credential : string;
    
    constructor(id : string,
        tagid: string,
        tagname: string,
        firstname: string,
        lastname: string,
        mail: string,
        coffee: string,
        password:string,
        pics:string[],
        userId: string,
        token : string){
        this.id=id;
        this.tagId=tagid;
        this.tagName=tagname;
        this.firstname=firstname;
        this.lastname=lastname;
        this.mail=mail;
        this.favouriteCoffee=coffee;
        this.password=password;
        this.pictures=pics;
        this.userId= userId;
        this.credential=token
    }

}