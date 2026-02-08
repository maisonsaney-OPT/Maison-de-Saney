import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-saney-dark mb-8">Politique de Confidentialité</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Collecte des données</h2>
          <p>
            Nous collectons les informations que vous nous fournissez lors de la création de votre compte, 
            de vos commandes ou lors de vos échanges avec notre service client. 
            Ces données peuvent inclure votre nom, adresse, email, numéro de téléphone.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Utilisation des données</h2>
          <p>
            Les données collectées sont utilisées pour :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Gérer vos commandes et livraisons</li>
            <li>Vous envoyer des informations sur nos produits et offres (si vous avez accepté)</li>
            <li>Améliorer nos services et votre expérience sur le site</li>
            <li>Répondre à vos demandes de support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Protection des données</h2>
          <p>
            Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. 
            Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Cookies</h2>
          <p>
            Nos cookies améliorent l'accès à notre site et identifient les visiteurs réguliers. 
            En outre, nos cookies améliorent l'expérience d'utilisateur grâce au suivi et au ciblage de ses intérêts. 
            Cependant, cette utilisation des cookies n'est en aucune façon liée à des informations personnelles identifiables sur notre site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Vos droits</h2>
          <p>
            Conformément à la loi « informatique et libertés » et au RGPD, vous disposez d'un droit d'accès, 
            de rectification et de suppression des données vous concernant. 
            Vous pouvez exercer ce droit en nous contactant à l'adresse email : contact@maisondesaney.com
          </p>
        </section>
      </div>
    </div>
  );
};
