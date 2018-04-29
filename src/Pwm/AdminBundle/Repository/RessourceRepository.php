<?php

namespace Pwm\AdminBundle\Repository;
use AppBundle\Entity\Session;
/**
 * RessourceRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class RessourceRepository extends \Doctrine\ORM\EntityRepository
{
     public function findNewRessources(Session $session){
       $now=new \DateTime();
       $now->modify('-20 day');
       $qb = $this->createQueryBuilder('r')->join('r.sessions','s')
         ->where('s.id=:session')
         ->orWhere('r.isPublic=:ispublic')
         ->setParameter('session',$session->getId())
         ->setParameter('ispublic',true)
          ->andWhere('r.date>:date')->setParameter('date',$now);
        return $qb->getQuery()->getResult();
  }

      public function findRessources(Session $session){
         $qb = $this->createQueryBuilder('r')->join('r.sessions','s')
         ->where('s.id=:session')
         ->orWhere('r.isPublic=:ispublic')
         ->setParameter('session',$session->getId())
         ->setParameter('ispublic',true)
         ->orderBy('r.date', 'desc');
          return $qb->getQuery()->getResult();
  } 
}
