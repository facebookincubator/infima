function menu($elements) {
  $elements.forEach($menu => {
    $menu.addEventListener('click', e => {
      if (e.target && e.target.classList.contains('menu-item')) {
        if (e.target.parentNode.classList.contains('menu-list-item')) {
          e.target.parentNode.classList.toggle('menu-list-item-collapsed');
        }
      }

      $menu
        .querySelectorAll('.menu-item')
        .forEach($elItem => $elItem.classList.remove('menu-link-active'));
      event.target.classList.add('menu-link-active');

      e.preventDefault();
    });
  });
}
