<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NoResultException;

/**
 * PointVenteRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class PointVenteRepository extends EntityRepository
{

/**
Nombre de point de vente recencés
 */
	public function nombrePointVente ($region=null){

        $qb = $this->createQueryBuilder('p');

   try {
		 $qb->select('count(p.id) as nombrePointVente');
         return $qb->getQuery()->getSingleScalarResult();  
   } catch (NoResultException $e) {
        return 0;
     }
  }

/**
Nombre de point de vente visités
 */
  public function pointVentes($region=null, $startDate=null, $endDate=null){

        $qb = $this->createQueryBuilder('p');
        if($region!=null){
           $qb->where('p.ville=:ville')
          ->setParameter('ville', $region);
          }
  
         return $qb->getQuery()->getResult();  
   
  }

/**
Nombre de point de vente visités
 */
  public function nombrePointVenteVisite($region=null, $startDate=null, $endDate=null){

        $qb = $this->createQueryBuilder('p')->join('p.visites','v');
        if($region!=null){
           $qb->where('p.ville=:ville')
          ->setParameter('ville', $region);
          }
    if($startDate!=null){
           $qb->andWhere('v.date>=:startDate')
          ->setParameter('startDate', new \DateTime($startDate));
          }
          if($endDate!=null){
           $qb->andWhere('v.date<=:endDate')
          ->setParameter('endDate',new \DateTime($endDate));
          } 

   try {
     $qb->select('count( distinct p.id) as nombrePointVenteVisite');

         return $qb->getQuery()->getSingleScalarResult();  
   } catch (NoResultException $e) {
        return 0;
     }
  }



  /**
  *Repartition des visites effectuees par semaine 
  */
  public function visitesParSemaine ($region=null, $startDate=null, $endDate=null){

       $qb = $this->createQueryBuilder('pv')->leftJoin('pv.visites','v');
        if($region!=null){
           $qb->where('pv.ville=:ville')
          ->setParameter('ville', $region);
          }
          if($startDate!=null){
           $qb->andWhere('v.date>=:startDate')->setParameter('startDate', new \DateTime($startDate));
          }
          if($endDate!=null){
           $qb->andWhere('v.date<=:endDate')->setParameter('endDate',new \DateTime($endDate));
          }
          $qb->select('v.weekText'); 
          $qb->addGroupBy('v.weekText');
          $qb->addSelect('count(v.id) as nombre'); 


          return $qb->getQuery()->getArrayResult();
     
  }

  /**
  *Repartition des visites effectuees par semaine 
  */
  public function eligibles ($note=0,$region=null, $startDate=null, $endDate=null){
        $stockMin=30;
        $conds=array(
                       array('produit'=>'FKM','cote'=>0.67,'sg'=>2),
                       array('produit'=>'FMT','cote'=>2.67,'sg'=>8),
                       array('produit'=>'FKS','cote'=>6.67,'sg'=>20),
                       );
       $em = $this->_em;
       $RAW_QUERY =($region!=null) ?'select * from (select idpv,nompv,(max(notemap) + max(noteexc) + sum(notestock) ) as note from (select pvproduittotal.idpv,nompv,nom, case when exc is not null then 5 else 0 end as noteexc, case when map is not null then 5 else 0 end as notemap,(case when (nom=:produit1 and sg>=2 and pvtotal.totalsg>=30 ) then 0.67 else 0 end + case when (nom=:produit2 and sg>=8 and pvtotal.totalsg>=30) then 2.67 else 0 end + case when (nom=:produit3 and sg>=20 and pvtotal.totalsg>=30) then 6.67 else 0 end )as notestock  from (select idpv,nompv, p.id, p.nom,v.id as idv,v.map,v.exc, sum(s.stock) as sd, sum(s.stockg) as sg from (select v.id,v.date,idpv,nompv,v.map,v.exc from (select pv.id as idpv ,pv.nom as nompv, max(v.date) as date from point_vente pv join visite v  on pv.id=v.point_vente_id and v.date>=:startDate and v.date<=:endDate and pv.ville=:region  group by  pv.id , pv.nom order by pv.id) as u  join  visite v on (u.idpv=v.point_vente_id and u.date=v.date)) as v join situation s on v.id=s.visite_id join  produit p  on p.id=s.produit_id group by idpv,nompv,p.nom,p.id,v.id,v.map,v.exc) pvproduittotal join (select idpv, sum(sg) as totalsg from (select idpv,nompv, p.id, p.nom,  sum(s.stock) as sd, sum(s.stockg) as sg from (select v.id,v.date,idpv,nompv from (select pv.id as idpv ,pv.nom as nompv, max(v.date) as date from point_vente pv join visite v  on pv.id=v.point_vente_id and v.date>=:startDate and v.date<=:endDate  group by  pv.id , pv.nom order by pv.id) as u  join  visite v on (u.idpv=v.point_vente_id and u.date=v.date)) as v join situation s on v.id=s.visite_id join  produit p  on p.id=s.produit_id group by idpv,nompv,p.nom,p.id) pvtotal group by idpv) pvtotal on pvproduittotal.idpv=pvtotal.idpv) pointnote group by idpv,nompv ) eligibilite where note>=0;
       ':'select * from (select idpv,nompv,(max(notemap) + max(noteexc) + sum(notestock) ) as note from (select pvproduittotal.idpv,nompv,nom, case when exc is not null then 5 else 0 end as noteexc, case when map is not null then 5 else 0 end as notemap,(case when (nom=:produit1 and sg>=2 and pvtotal.totalsg>=30 ) then 0.67 else 0 end + case when (nom=:produit2 and sg>=8 and pvtotal.totalsg>=30) then 2.67 else 0 end + case when (nom=:produit3 and sg>=20 and pvtotal.totalsg>=30) then 6.67 else 0 end )as notestock  from (select idpv,nompv, p.id, p.nom,v.id as idv,v.map,v.exc, sum(s.stock) as sd, sum(s.stockg) as sg from (select v.id,v.date,idpv,nompv,v.map,v.exc from (select pv.id as idpv ,pv.nom as nompv, max(v.date) as date from point_vente pv join visite v  on pv.id=v.point_vente_id and v.date>=:startDate and v.date<=:endDate  group by  pv.id , pv.nom order by pv.id) as u  join  visite v on (u.idpv=v.point_vente_id and u.date=v.date)) as v join situation s on v.id=s.visite_id join  produit p  on p.id=s.produit_id group by idpv,nompv,p.nom,p.id,v.id,v.map,v.exc) pvproduittotal join (select idpv, sum(sg) as totalsg from (select idpv,nompv, p.id, p.nom,  sum(s.stock) as sd, sum(s.stockg) as sg from (select v.id,v.date,idpv,nompv from (select pv.id as idpv ,pv.nom as nompv, max(v.date) as date from point_vente pv join visite v  on pv.id=v.point_vente_id and v.date>=:startDate and v.date<=:endDate  group by  pv.id , pv.nom order by pv.id) as u  join  visite v on (u.idpv=v.point_vente_id and u.date=v.date)) as v join situation s on v.id=s.visite_id join  produit p  on p.id=s.produit_id group by idpv,nompv,p.nom,p.id) pvtotal group by idpv) pvtotal on pvproduittotal.idpv=pvtotal.idpv) pointnote group by idpv,nompv) eligibilite where note>0 ;
';
       $statement = $em->getConnection()->prepare($RAW_QUERY);
         if($region!=null){
        $statement->bindValue('region', $region);
          }
         $startDate=new \DateTime($startDate);
       $endDate=new \DateTime($endDate);
       $statement->bindValue('startDate', $startDate->format('Y-m-d'));
       $statement->bindValue('endDate',  $endDate->format('Y-m-d'));
       
      // $statement->bindValue('sg', $stockMin);
       // $statement->bindValue('note', $note);
       $statement->bindValue('produit1', $conds[0]['produit']);
      // $statement->bindValue('sg1', $conds[0]['sg']);
      // $statement->bindValue('cote1', $conds[0]['cote']);
       $statement->bindValue('produit2', $conds[1]['produit']);
      // $statement->bindValue('sg2',  $conds[1]['sg']);
      // $statement->bindValue('cote2',  $conds[1]['cote']);
       $statement->bindValue('produit3',  $conds[2]['produit']);
      // $statement->bindValue('sg3',  $conds[2]['sg']);
      // $statement->bindValue('cote3',  $conds[2]['cote']);
       $statement->execute();
      return  $result = $statement->fetchAll();
     
  }
  /**
  *Repartition des visites effectuees par semaine 
  */
  public function StockParSemaine ($region=null, $startDate=null, $endDate=null){

       $qb = $this->createQueryBuilder('pv')->leftJoin('pv.visites','v');
        if($region!=null){
           $qb->where('pv.ville=:ville')
          ->setParameter('ville', $region);
          }
          if($startDate!=null){
           $qb->andWhere('v.date>=:startDate')->setParameter('startDate', new \DateTime($startDate));
          }
          if($endDate!=null){
           $qb->andWhere('v.date<=:endDate')->setParameter('endDate',new \DateTime($endDate));
          }
          $qb->select('v.weekText'); 
          $qb->addGroupBy('v.weekText');
          $qb->addSelect('count(v.id) as nombre'); 
          return $qb->getQuery()->getArrayResult();  
  }

  


/*
for mobile
*/
  public function pdvs ($region=null){
  $em = $this->_em; //and pv.ville=:region
  $RAW_QUERY ='select u.id,u.nom, u.date as lastvisitedate, nombre , type from (select distinct pv.id ,pv.nom,pv.type, max(v.date) as date, count(v.id) as nombre from point_vente pv left join visite v  on pv.id=v.point_vente_id    group by  pv.id, pv.nom,pv.type order by date asc) u ;';
    $statement = $em->getConnection()->prepare($RAW_QUERY);
   // $statement->bindValue('region', $region);
    $statement->execute();
      return  $result = $statement->fetchAll();
  }
}
