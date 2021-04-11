import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPopComponent } from './chat-pop.component';

describe('ChatPopComponent', () => {
  let component: ChatPopComponent;
  let fixture: ComponentFixture<ChatPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
