/** "authentification" doit etre ajouté à toutes les "routes" nécessitant que le user soit connecté 
 * b64 permet une bonne transmission des données de la requete http, notamment concernant les caractères spéciaux, mais n'offre aucune sécurité !
*/

import 'dotenv/config'

export function authentification(req, res, next) {

/** On récupère l'en-tête d'autorisation de la requête HTTP ; si elle n'existe pas,
     * on utilise "" par défaut pour éviter une valeur undefined.
     * On divise la chaîne obtenue en un tableau et on récupère l'élément à l'index 1,
     * car l'en-tête d'autorisation ressemble à "Basic [identifiants encodés en base64]".
    */
 
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    console.log(req.headers.authorization);
    console.log(b64auth);

    
    /** Un buffer est utilisé pour convertir les données binaires (b64 ici) et vice-versa
     * le toString va implémenter un : entre login et password.
     */
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    console.log(Buffer.from(b64auth, 'base64').toString().split(':'));

  
    // Vérifier le password et le login existent, si login === LOGIN et si password === PASSWORD
    if (login && password && login === process.env.LOGIN && password === process.env.PASSWORD) {
      console.log("ok");
      res.status(200).send("authentification réussie")
      return next(); // si succès on passe au middleware suivant
      
    }
    console.log("echec");
    return res.sendStatus(401);
   
}