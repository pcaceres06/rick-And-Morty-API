import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.scss'],
})
export class AllCharactersComponent implements OnInit {

  allCharacters: any;
  nexPage: any;
  actPage: any;
  prevPage: any;

  constructor(
    private randmService: RickAndMortyService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.randmService.getAllCharacters().then( (res: any) => {
      this.allCharacters = res;
      this.getPages(res);

      console.log (this.allCharacters);
    });
  }

  getPages(res: any) {
    var infoActPage = (res.info.next).split("=");
    this.nexPage = parseInt(infoActPage[1]);
    this.actPage = this.nexPage - 1;
    this.prevPage = this.actPage == 1 ? 0 : this.actPage - 1;
  }  

  async openModal(data: any) {
    const modal = await this.modalController.create({
    component: CharacterDetailComponent,
    componentProps: { character: data }
    });
    return await modal.present();
   }

  async getNextPage() {
    this.randmService.getPageCharacters(this.nexPage).then( (res: any) => {
      this.allCharacters = res;
      this.getPages(res);
      console.log (this.allCharacters);
    });
  }

  async getPrevPage() {
    this.randmService.getPageCharacters(this.prevPage).then( (res: any) => {
      this.allCharacters = res;
      this.getPages(res);
      console.log (this.allCharacters);
    });
  }
}
