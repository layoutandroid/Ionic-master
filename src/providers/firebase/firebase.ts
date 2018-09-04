import { LoginPage } from './../../pages/login/login';
import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import firebase from '../../../node_modules/firebase';
import AuthProvider = firebase.auth.AuthProvider;
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user.model';


/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  public Superuser: firebase.User;
  private db_users: Observable<User[]>;
  private main_users : Observable<User[]>;
  public username: string = ""
  public isRegistredUser:boolean = false;


  constructor(public afd: AngularFireDatabase,public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.Superuser = user;
    });
    debugger;
    this.db_users =this.afd.list<User>('/User').valueChanges();
    //console.log(""+this.usert.count);

   }

  getShoppingItems() : any {
    return this.db_users;
  }


  async findEmail (email){
    return await (this.main_users = this.afd.list<User>('/User',
    ref => ref.orderByChild('Email').equalTo(email)).valueChanges());
  }

  addUser(name) {
    debugger;
    return this.afd.list('/User/').push(name);
  }
  removeItem(id) {
    this.afd.list('/User/').remove(id);
  }

  signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.Email, credentials.password);
  }

  signOut(): Promise<void> {
    this.Superuser = null;
    return this.afAuth.auth.signOut();
  }

  getEmail() {
    return this.Superuser && this.Superuser.email;
  }



getFreshUser(): any {
     this.afAuth.authState.subscribe( user => {
       if (user) {
        this.Superuser=user;
        return this.Superuser;
      } else {
        return null;
      }
    },
    () => {
      return null;
    }
  );
}



getUser(): any {
  return this.Superuser;
}

setUsername(){
  if (this.Superuser) {
    this.findEmail(this.Superuser.email).then (
      (ref)=>{
      var uber=ref;
      ////
      uber.subscribe ((res: User[]) => {
            console.log(res);
        var m_user = res
        if(m_user.length!==0)
        {

          this.username = res[0].Username;
          this.isRegistredUser = true;
        }
        },
        ()=>{
          this.isRegistredUser = true;
        }
      );

    }
    );
 }
}




signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }


private oauthSignIn(provider: AuthProvider) {
	if (!(<any>window).cordova) {
		return this.afAuth.auth.signInWithPopup(provider);
	} else {
		return this.afAuth.auth.signInWithRedirect(provider)
		.then(() => {
			return this.afAuth.auth.getRedirectResult().then( result => {
				// This gives you a Google Access Token.
				// You can use it to access the Google API.
				let token = result.credential;
				// The signed-in user info.
				let user = result.user;
        console.log(token, user);
        return user;
			}).catch(function(error) {
        // Handle Errors here.
        alert(error.message);
        return error;
			});
		});
	}
}

resetPassword(email: string): Promise<void> {
  return this.afAuth.auth.sendPasswordResetEmail(email);
}

sendEmailVerificationLink(user) {
  const actionCodeSettings = {"url":"https://ionicmaster-7c02a.firebaseapp.com/" };

  return user.sendEmailVerification(actionCodeSettings );
}

sendEmailLink(email) {
  const actionCodeSettings = {"url":"https://ionicmaster-7c02a.firebaseapp.com/" };

    return this.afAuth.auth.sendSignInLinkToEmail(email,actionCodeSettings);
}

loginStatus() {
  this.afAuth.authState.subscribe(
    (user) => {
        if (user && user.emailVerified) {

         // this.firebaseProvider.setFreshUser(user);
        } else {
          this.Superuser=null;
          this.db_users=null;
          this.main_users=null;
          this.username = ""
          this.isRegistredUser = false;



        }
      },
      (error) => {
       }
    );
  }

}
