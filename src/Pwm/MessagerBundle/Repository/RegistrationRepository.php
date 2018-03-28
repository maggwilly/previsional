<?php

namespace Pwm\MessagerBundle\Repository;

/**
 * DistRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class RegistrationRepository extends \Doctrine\ORM\EntityRepository
{
	  public function findNotsingup(){
         $qb = $this->createQueryBuilder('r')
         ->where('r.info is NULL'); 
          return $qb->getQuery()->getResult();
  }
	 
	 public function findTooLongTimeLogin(){
	 	$delay=new \DateTime();
	 	$delay->modify('-15 day');
         $qb = $this->createQueryBuilder('r')
         ->where('r.latLoginDate>=:latLoginDate') ->setParameter('latLoginDate',$delay); 
          return $qb->getQuery()->getResult();
  }

    public function findAll(){
         $qb = $this->createQueryBuilder('r')
         ->where('r.isFake is NULL'); 
          return $qb->getQuery()->getResult();
  }
   
}
