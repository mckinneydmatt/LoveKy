/** Product list used when Sanity is unavailable or has no products. */
const sharedDescription =
  "A rich, incredibly moist chocolate cake topped with your choice of signature whipped chocolate frosting or whipped vanilla bean frosting — light, silky, and never overly sweet. It's the cake people can't stop talking about."

export const defaultProducts = [
  {
    id: 'signature-chocolate-cake',
    name: 'Signature Chocolate Cake',
    price: '$55',
    glutenFreePrice: '$65',
    servingInfo: 'Serves 12 generously — up to 24 smaller party servings',
    description: sharedDescription,
  },
  {
    id: '6-signature-mini-cakes',
    name: '6 Signature Mini Cakes',
    price: '$42',
    glutenFreePrice: '$48',
    servingInfo: null,
    description: sharedDescription,
  },
  {
    id: '12-signature-mini-cakes',
    name: '12 Signature Mini Cakes',
    price: '$77',
    glutenFreePrice: '$88',
    servingInfo: null,
    description: sharedDescription,
  },
  {
    id: '24-signature-mini-cakes',
    name: '24 Signature Mini Cakes',
    price: '$155',
    glutenFreePrice: '$175',
    servingInfo: null,
    description: sharedDescription,
  },
] as const
