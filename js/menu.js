function menu($elements) {
  $elements.forEach($menu => {
    $menu.addEventListener('click', e => {
      $listItem = e.target;
      while ($listItem) {
        if ($listItem.classList.contains('menu-list-item')) {
          break;
        }
        $listItem = $listItem.parentNode;
      }

      // Not clicking on a list item.
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

      $menu
        .querySelectorAll('.menu-list-item')
        .forEach($elItem => $elItem.classList.remove('menu-list-item-active'));

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

    $button = $menu.querySelector('.menu-button');
    $button.addEventListener('click', e => {
      $menu.classList.toggle('menu-show');
    });
  });
}
