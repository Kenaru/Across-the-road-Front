

class printer():
    def __init__(self):
        self = str(self)
        self = str.lower(self)
        for i in self:
            if i == ' ':
                i = '_'
            else:
                pass
        self = str(self)

    def head(self):
        head = (f'<!DOCTYPE html>\n\
<html lang="en">\n\
<head>\n\
    <meta charset="UTF-8">\n\
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\
    <title>{self}</title>\n\
</head>\n')
        print(head)
        

test = printer()
test.__init__()
test.head()