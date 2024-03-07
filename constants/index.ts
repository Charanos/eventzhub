export const headerLinks = [
    {
        label: 'Home',
        route: '/',
    },
    {
        label: 'Create Event',
        route: '/events/create',
    },
    {
        label: 'My Profile',
        route: '/profile',
    },
]

export const eventDefaultValues = {
    url: '',
    title: '',
    price: '',
    location: '',
    imageUrl: '',
    isFree: false,
    categoryId: '',
    description: '',
    endDateTime: new Date(),
    startDateTime: new Date(),
}
