<?php

namespace AppBundle\Repository;
use AppBundle\Entity\User; 
/**
 * UserRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class UserRepository extends \Doctrine\ORM\EntityRepository
{
      public function findByUser(User $user,$start=0){
           $qb = $this->createQueryBuilder('p')
           ->where('p.parent=:user')
           ->setParameter('user', $user);
         return $qb->getQuery()->setFirstResult($start)->setMaxResults(100)->getResult(); 
  }
}
