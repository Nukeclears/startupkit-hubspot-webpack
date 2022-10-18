import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'
import focus from '@alpinejs/focus'
import mask from '@alpinejs/mask'
import collapse from '@alpinejs/collapse'
 
Alpine.plugin(intersect, focus, mask, collapse)

window.Alpine = Alpine
 
Alpine.start()