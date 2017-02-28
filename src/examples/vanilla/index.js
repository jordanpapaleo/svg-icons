const icons = document.querySelector('.icons')

const iconsArray =[
  svgService.getTemplate('SALE', 3),
  svgService.getTemplate('SALEAPPRAISAL', 100),
  svgService.getTemplate('LISTING', 1),
  svgService.getTemplate('LISTINGAPPRAISAL', 10),
  svgService.getTemplate('VALUE_CONCLUSION')
]

icons.innerHTML =  iconsArray.join(' ')
