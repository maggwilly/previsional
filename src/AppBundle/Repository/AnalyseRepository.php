<?php

namespace AppBundle\Repository;
use AppBundle\Entity\Programme;
use AppBundle\Entity\Matiere;
use AppBundle\Entity\Partie;
/**
 * AnalyseRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class AnalyseRepository extends \Doctrine\ORM\EntityRepository
{
		 /**
  *Nombre de synchro effectue par utilisateur 
  */
  public function findOneOrNull($studentId, Programme $concours, Matiere $matiere=null, Partie $partie=null){
         $qb = $this->createQueryBuilder('a')
         ->where('a.studentId=:studentId')->setParameter('studentId',$studentId)
            ->andWhere('a.concours=:concours')->setParameter('concours',$concours);
         if($matiere!=null)
           $qb ->andWhere('a.matiere=:matiere')->setParameter('matiere',$matiere);
         else
           $qb ->andWhere('a.matiere is null');
           if($partie!=null)
           $qb ->andWhere('a.partie=:partie')->setParameter('partie',$partie);
           else
             $qb ->andWhere('a.partie is null');
          return $qb->getQuery()->getOneOrNullResult();
  }
}