function menu($elements) {
  $elements.forEach($menu => {
    $menu.addEventListener('click', e => {
      $menu
        .querySelectorAll('.menu-list-item')
        .forEach($elItem => $elItem.classList.remove('menu-list-item-active'));

      $listItem = e.target;
      while ($listItem) {
        if ($listItem.classList.contains('menu-list-item')) {
          break;
        }
        $listItem = $listItem.parentNode;
      }

      if (!$listItem) {
        return;
      }

      e.preventDefault();
      if ($listItem.classList.contains('menu-list-item')) {
        $listItem.classList.toggle('menu-list-item-collapsed');
      }

      // Don't add any active class if non-leaf item selected.
      if ($listItem.querySelector('.menu-list')) {
        return;
      }

      // Traverse parents and add active class.
      while ($listItem) {
        if ($listItem.classList.contains('menu')) {
          break;
        }

        if ($listItem.classList.contains('menu-list-item')) {
          $listItem.classList.add('menu-list-item-active');
        }

        $listItem = $listItem.parentNode;
      }
    });
  });
}
