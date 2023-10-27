import os

class printer():
    def __init__(self, name):
        name = str(name)
        name = str.lower(name)
        for i in name:
            if i == ' ':
                name = name.replace(i, '')
            elif i == '?' or i == "'" or i == '!' or i=='.' or i==',' or i==':' or i==';' or i =='/':
                name = name.replace(i, '')
            else:
                pass
        name = str(name)
        # sortir le name pour le réutiliser dans le head
        self.name = name

    def create_way(self, name):
        try:
            # rentre dans le dossier asso et crée le dossier du nom du site
            os.chdir('../asso')
            os.mkdir(name)
            os.chdir(name)
            # crée les dossiers css et img
            os.mkdir('css')
            os.mkdir('img')

        except:
            print('Le dossier existe déjà. Nom de site déja pris.')
        

    def head(self, name, name_site):
        head = (f'<!DOCTYPE html>\n\
<html lang="fr">\n\
<head>\n\
    <meta charset="UTF-8">\n\
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\
    <link rel="stylesheet" href="./css/style_{name}.css">\n\
    <title>{name_site}</title>\n\
</head>\n')
        print(head)

    
        


name_site = input('Quel est le nom du site ? : ')

test = printer(name_site)
test.__init__(name_site)
test.head(test.name, name_site)
test.create_way(test.name)