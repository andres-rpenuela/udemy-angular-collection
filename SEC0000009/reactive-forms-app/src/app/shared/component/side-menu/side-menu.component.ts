import {Component, inject} from '@angular/core';
import {MenuItem} from '../../interfaces/menu-item.interface';
import {authItems, reactiveItems} from '../../data/routes.data';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {LocaleService} from '../../services/locale.service';
import {Locale, LOCALE_EN, LOCALE_ES} from '../../types/locale.type';


@Component({
  selector: 'app-side-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
  standalone: true
})
export class SideMenuComponent {
  // se genera el menu de items de reactive
  protected  reactiveMenuItems: MenuItem[] = reactiveItems
    .filter( item => !item.path?.includes('**'))
    .map(item => ({
        title:`${item.title}`,
        route:`reactive/${item.path}`
      })
    );

  protected countryMenuItems: MenuItem[] = [
    {
      title: 'Country',
      route: `./country`
    }
    ];

  protected authMenuItem: MenuItem[] = authItems
    .filter( item => !item.path?.includes('**'))
    .map( item =>({
      title: `${item.title}`,
      route: `auth/${item.path}`
    }))

  protected readonly LOCALE_ES = LOCALE_ES;
  protected readonly LOCALE_EN = LOCALE_EN;

  private localeService = inject(LocaleService);

  switchLang(locale:Locale){
    this.localeService.changeLocale(locale);
  }
}
