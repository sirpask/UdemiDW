export class User{
    //es lo mismo que: public _id: string;
        //ahora esto se puede simplificar
        //constructor(
        //  _id: string
        //) {
        //  this._id = _id;
        //  }

        constructor(
                public _id: string,
                public name: string,
                public surname: string,
                public email: string,
                public password: string,
                public role: string,
                public image: string
        ){}


}
