<?php

namespace AppBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;


/**
 * /**
 * @ORM\Table(name="user_account")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
  *@ORM\HasLifecycleCallbacks()
 */
class User extends BaseUser
{
    
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
	
   
    /**
     * @var string
     * @ORM\Column(name="entreprise", type="string", length=255,nullable=true)
     */
    private $entreprise;
    /**
     * @var string
     * @ORM\Column(name="nom", type="string", length=255,nullable=true)
     */
    private $nom;

   /**
     * @var string
     * @ORM\Column(name="ville", type="string", length=255,nullable=true)
     */
    private $ville;


       /**
     * @var string
     * @ORM\Column(name="quartier", type="string", length=255,nullable=true)
     */
    private $quartier;

       /**
     * @var string
     * @ORM\Column(name="registration", type="text",nullable=true)
     */
    private $registration;


    /**
     * @var string
     * @ORM\Column(name="pays", type="string", length=255,nullable=true)
     */
    private $pays;


     /**
     * @var string
     * @ORM\Column(name="adresse", type="string", length=255,nullable=true)
     */
    private $adresse;

   /**
     * @var string
     * @ORM\Column(name="type", type="string", length=255, nullable=true)
     */
    private $type;

   /**
     * @var string
     * @ORM\Column(name="phone", type="string", length=255,nullable=true)
     */
    private $phone;

     /**
     * @var string
     * @ORM\Column(name="username", type="string", length=255,unique=true)
     */
    protected $username;

    /**
     * @var string
     * @ORM\Column(name="password", type="string")
     */
    protected $password;

    /**
     * Plain password. Used for model validation. Must not be persisted.
     * @var string
     */
    protected $plainPassword;

     /**
     * @var string
     *
     * @ORM\Column(name="usernameCanonical", type="string", length=180, unique=true, nullable=false)
     */
    protected $usernameCanonical;

   /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=180)
     */
    protected $email;

    /**
     * @var string
     *
     * @ORM\Column(name="emailCanonical", type="string", length=180, unique=true)
     */
    protected $emailCanonical;

    /**
     * @var bool
     *
     * @ORM\Column(name="enabled", type="boolean",nullable=true)
     */
    protected $enabled;

    /**
     * @var string
     *
     * @ORM\Column(name="salt", type="string")
     */
    protected $salt;


   /**
     * @var \DateTime
     *
     * @ORM\Column(name="lastLogin", type="datetime", nullable=true)
     */
    protected $lastLogin;

    /**
     * @var string
     *
     * @ORM\Column(name="confirmationToken", type="string", length=180,unique=true ,nullable=true)
     */
    protected $confirmationToken;

   /**
     * @var \DateTime
     *
     * @ORM\Column(name="passwordRequestedAt", type="datetime" , nullable=true)
     */
    protected $passwordRequestedAt;


    /**
     * @var bool
     *
     * @ORM\Column(name="locked", type="boolean",nullable=true)
     */
    protected $locked;

        /**
     * @var bool
     *
     * @ORM\Column(name="terms_accepted", type="boolean",nullable=true)
     */
    protected $termsAccepted;

    /**
     * @var bool
     *
     * @ORM\Column(name="expired", type="boolean",nullable=true)
     */
    protected $expired;

     /**
     * @var \DateTime
     *
     * @ORM\Column(name="expiresAt", type="datetime",nullable=true)
     */
    protected $expiresAt;


  
     /**
     * @var array
     *
     * @ORM\Column(name="roles", type="array")
     */
    protected $roles;

     /**
     * @var bool
     *
     * @ORM\Column(name="credentialsExpired", type="boolean",nullable=true)
     */
    protected $credentialsExpired;

     /**
     * @var \DateTime
     *
     * @ORM\Column(name="credentialsExpireAt", type="datetime",nullable=true)
     */
    protected $credentialsExpireAt;



     /**
   * @ORM\OneToOne(targetEntity="AppBundle\Entity\Abonnement", mappedBy="user")
   */
    private $abonnement;

   private $invited;


 /**
   * @ORM\OneToMany(targetEntity="AppBundle\Entity\User", mappedBy="parent", cascade={"persist","remove"})
   */
    private $vendeurs;


    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User",inversedBy="vendeurs")
     * @var User
     */
    protected $parent;
    /**
     * @ORM\Column(type="string", unique=true)
     */
    protected $apiKey;
    /**
     * Constructor
     */
 
 public function __construct()
    {
        parent::__construct();

        $this->pays='Cameroun';
    }

 /**
  * @ORM\PrePersist
 */
 public function prePersist(){
       $this->phone = $this->username;
       if (!$this->parent) {
         $this->parent=$this;
       }
        if (!$this->entreprise) {
           $this->entreprise=$this->nom;
       }
       $this->apiKey=md5(uniqid());
 } 
  
    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set nom
     *
     * @param string $nom
     * @return Client
     */
    public function setNom($nom)
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Set nom
     *
     * @param string $nom
     * @return Client
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }
   

    /**
     * Get nom
     *
     * @return string 
     */
    public function getNom()
    {
        return $this->nom;
    }





    public function __toString()
    {
        return $this->getUsername();
    }

      /**
     * Get parties
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getParties()
    {
        return $this->parties;
    }

    /**
     * Get enabled
     *
     * @return boolean 
     */
    public function getEnabled()
    {
        return $this->enabled;
    }

    /**
     * Set salt
     *
     * @param string $salt
     * @return Client
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;

        return $this;
    }

    /**
     * Get locked
     *
     * @return boolean 
     */
    public function getLocked()
    {
        return $this->locked;
    }

    /**
     * Get locked
     *
     * @return boolean 
     */
    public function setLocked($locked)
    {
        $this->locked=$locked;
        return $this;
    }

    /**
     * Get expired
     *
     * @return boolean 
     */
    public function getExpired()
    {
        return $this->expired;
    }


    /**
     * Get locked
     *
     * @return boolean 
     */
    public function setInvited($invited)
    {
        $this->invited=$invited;
        return $this;
    }

    /**
     * Get expired
     *
     * @return boolean 
     */
    public function getInvited()
    {
        return $this->invited;
    }
    /**
     * Get expiresAt
     *
     * @return \DateTime 
     */
    public function getExpiresAt()
    {
        return $this->expiresAt;
    }

    /**
     * Get credentialsExpired
     *
     * @return boolean 
     */
    public function getCredentialsExpired()
    {
        return $this->credentialsExpired;
    }

    /**
     * Get credentialsExpireAt
     *
     * @return \DateTime 
     */
    public function getCredentialsExpireAt()
    {
        return $this->credentialsExpireAt;
    }



        /**
     * Set ville
     *
     * @param string $ville
     * @return PointVente
     */
    public function setVille($ville)
    {
        $this->ville = $ville;

        return $this;
    }

    /**
     * Get ville
     *
     * @return string 
     */
    public function getVille()
    {
        return $this->ville;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return User
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set phone
     *
     * @param string $phone
     *
     * @return User
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

      public function getUsername()
    {
        return $this->email;
    }  



    /**
     * Set termsAccepted
     *
     * @param boolean $termsAccepted
     *
     * @return User
     */
    public function setTermsAccepted($termsAccepted)
    {
        $this->termsAccepted = $termsAccepted;

        return $this;
    }

    /**
     * Get termsAccepted
     *
     * @return boolean
     */
    public function getTermsAccepted()
    {
        return $this->termsAccepted;
    }



    /**
     * Set parent
     *
     * @param \AppBundle\Entity\User $parent
     *
     * @return User
     */
    public function setParent(\AppBundle\Entity\User $parent = null)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get parent
     *
     * @return \AppBundle\Entity\User
     */
    public function getParent()
    {
        if($this->isMe())
            return $this;  
        return $this->getParent();
    }


   public function isMe(){
     if (is_null($this->parent)) {
        return true;
     }
    return ($this->parent->getId()== $this->id);
   }



    /**
     * Set entreprise
     *
     * @param string $entreprise
     *
     * @return User
     */
    public function setEntreprise($entreprise)
    {
        $this->entreprise = $entreprise;

        return $this;
    }

    /**
     * Get entreprise
     *
     * @return string
     */
    public function getEntreprise()
    {    if ($this->isMe()) {
        return $this->entreprise;
    }
        return $this->parent->getEntreprise();
    }

    /**
     * Set quartier
     *
     * @param string $quartier
     *
     * @return User
     */
    public function setQuartier($quartier)
    {
        $this->quartier = $quartier;

        return $this;
    }

    /**
     * Get quartier
     *
     * @return string
     */
    public function getQuartier()
    {
        return $this->quartier;
    }

    /**
     * Set pays
     *
     * @param string $pays
     *
     * @return User
     */
    public function setPays($pays)
    {
        $this->pays = $pays;

        return $this;
    }

    /**
     * Get pays
     *
     * @return string
     */
    public function getPays()
    {
        return $this->pays;
    }

    /**
     * Set adresse
     *
     * @param string $adresse
     *
     * @return User
     */
    public function setAdresse($adresse)
    {
        $this->adresse = $adresse;

        return $this;
    }

    /**
     * Get adresse
     *
     * @return string
     */
    public function getAdresse()
    {
        return $this->adresse;
    }


    /**
     * Set registration
     *
     * @param string $registration
     *
     * @return User
     */
    public function setRegistration($registration)
    {
        $this->registration = $registration;

        return $this;
    }

    /**
     * Get registration
     *
     * @return string
     */
    public function getRegistration()
    {
        return $this->registration;
    }

    /**
     * Set abonnement
     *
     * @param \AppBundle\Entity\Abonnement $abonnement
     *
     * @return User
     */
    public function setAbonnement(\AppBundle\Entity\Abonnement $abonnement = null)
    {
        $this->abonnement = $abonnement;

        return $this;
    }

    /**
     * Get abonnement
     *
     * @return \AppBundle\Entity\Abonnement
     */
    public function getAbonnement()
    {
        return $this->abonnement;
    }

    /**
     * Set apiKey
     *
     * @param string $apiKey
     *
     * @return User
     */
    public function setApiKey($apiKey)
    {
        $this->apiKey = $apiKey;

        return $this;
    }

    /**
     * Get apiKey
     *
     * @return string
     */
    public function getApiKey()
    {
        return $this->apiKey;
    }
}
