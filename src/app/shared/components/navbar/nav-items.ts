interface NavItem {
  path: string;
  title: string;
  icon?: string;
  roleAccepted: string[];
}

const links: NavItem[] = [
  {
    path: 'alumnos',
    title: 'Alumnos',
    icon: 'person',
    roleAccepted: ['Director', 'Profesor']
  },
  {
    path: 'inscripciones',
    title: 'Inscripciones',
    icon: 'people_outline',
    roleAccepted: ['Director']
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'shopping_cart',
    roleAccepted: ['Director']
  },
]

export default links;
