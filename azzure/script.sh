#!/bin/bash 
nbre_lignes=$(wc -l < fichier.txt);
echo $nbre_lignes>>fichier.txt;
echo $nbre_lignes;
