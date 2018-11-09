<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Campagne;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\File;
/**
 * Campagne controller.
 *
 */
class CampagneController extends Controller
{
    /**
     * Lists all campagne entities.
     *
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $campagnes = $em->getRepository('AppBundle:Campagne')->findAll();

        return $this->render('layout.html.twig', array(
            'campagnes' => $campagnes,
        ));
    }

    public function camapgnesByContryAction($pays)
    {
        $em = $this->getDoctrine()->getManager();
        $campagnes = $em->getRepository('AppBundle:Campagne')->findByPays($pays);
        return $this->render('campagne/index.html.twig', array(
            'campagnes' => $campagnes,
        ));
    }
    /**
     * Creates a new campagne entity.
     *
     */
    public function newAction(Request $request)
    {       
        $campagne = new Campagne();
        $form = $this->createForm('AppBundle\Form\CampagneType', $campagne);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($campagne);
            $em->flush();          
            return $this->redirectToRoute('homepage');
        }
        return $this->render('campagne/new.html.twig', array(
            'campagne' => $campagne,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a campagne entity.
     *
     */
    public function showAction(Campagne $campagne)
    {
        $deleteForm = $this->createDeleteForm($campagne);
        $folder=__DIR__ . '/../../../web/activations/'.$campagne->getPays().'/'.$campagne->getFolder().'/rapports';
        $rapports =array_diff( scandir( $folder), array('..', '.'));
        $folder1=__DIR__ . '/../../../web/activations/'.$campagne->getPays().'/'.$campagne->getFolder().'/donnees';
        $donnees =array();//array_diff( scandir( $folder1), array('..', '.'));
        return $this->render('campagne/show.html.twig', array(
            'campagne' => $campagne,
            'rapports' => $rapports,
            'donnees' => $donnees,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing campagne entity.
     *
     */
    public function editAction(Request $request, Campagne $campagne)
    {
        $deleteForm = $this->createDeleteForm($campagne);
        $editForm = $this->createForm('AppBundle\Form\CampagneType', $campagne);
        $editForm->handleRequest($request);
        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();
            return $this->redirectToRoute('campagne_show', array('id' => $campagne->getId()));
        }
        return $this->render('campagne/edit.html.twig', array(
            'campagne' => $campagne,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }
    public function addRapportAction(Request $request, Campagne $campagne)
    {
        ini_set('post_max_size', '64M');
        ini_set('upload_max_filesize', '64M');
        $editForm = $this->createFormBuilder(array())
        ->add('rapportName','text' , array('label'=>'Nom du rapport'))
        ->add('rapport','file' , array(
            'label'=>'Télecharger le fichier',
            'required' => true,
            'constraints' => [
                new File([
                    'maxSize' => '20M',
                    'mimeTypes' => [
                        'application/pdf',
                        'application/x-pdf',
                    ],
                    'mimeTypesMessage' => 'Please upload a valid PDF fle',
                ])
            ]
        ))
        ->getForm();
        $editForm->handleRequest($request);
        if ($editForm->isSubmitted() && $editForm->isValid()) {
           $data= $editForm->getData();
            $file = $data['rapport'];
            $rapportName=$data['rapportName'];
            $folder=__DIR__ . '/../../../web/activations/'.$campagne->getPays().'/'.$campagne->getFolder().'/rapports';
            if(file_exists( $folder.'/'.$rapportName.'.pdf')){
                unlink($folder.'/'.$rapportName.'.pdf');
            }
            $file->move($folder, $rapportName.'.pdf');
            return $this->redirectToRoute('campagne_show', array('id' => $campagne->getId()));
        }
        return $this->render('campagne/editOne.html.twig', array(
            'campagne' => $campagne,
            'label' => 'Ajouter un nouveau rapport',
            'edit_form' => $editForm->createView(),
        ));
    }

    public function editOneAction(Request $request, Campagne $campagne,$field)
    {
        $label='';
        switch ($field) {
            case 'concurrence':
               $label='Activité de la concurrence';
                break;
            case 'mecanisme':
                $label='Mecanisme de campagne';
                break; 
            case 'principe':
                 $label='Principe de campagne';
                 break;                               
            default:
                 $label='Feedback Consomateur';
                break;
        }

        $editForm = $this->createFormBuilder($campagne)
              ->add($field,'textarea' ,
              array('label'=>$label,
              'attr'=>array('class'=>"form-control markdown","rows"=>"5","data-height"=>"300" ,"data-lang"=>"fr")))
              ->getForm();
             $editForm->handleRequest($request);
        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();
            return $this->redirectToRoute('campagne_show', array('id' => $campagne->getId(),'field' => $field));
        }
        return $this->render('campagne/editOne.html.twig', array(
            'campagne' => $campagne,
            'label' => $label,
            'edit_form' => $editForm->createView(),
        ));
    }    
    /**
     * Deletes a campagne entity.
     *
     */
    public function deleteAction(Request $request, Campagne $campagne)
    {
        $form = $this->createDeleteForm($campagne);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($campagne);
            $em->flush();
        }

        return $this->redirectToRoute('campagne_index');
    }

    /**
     * Creates a form to delete a campagne entity.
     *
     * @param Campagne $campagne The campagne entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Campagne $campagne)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('campagne_delete', array('id' => $campagne->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
