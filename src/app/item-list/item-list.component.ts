import { Component, OnDestroy, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

import { TabItem } from '../models/Item';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  allTabItems: Array<TabItem> = [
    {
      id: 1,
      title: 'Title 1',
      content: 'Tab content 1 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores consequatur error, in iusto laboriosam laborum laudantium molestiae natus obcaecati porro praesentium quaerat quidem quo ratione sapiente voluptas voluptatem voluptates.',
    },
    {
      id: 2,
      title: 'Title 2',
      content: 'Tab content 2 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores consequatur error, in iusto laboriosam laborum laudantium molestiae natus obcaecati porro praesentium quaerat quidem quo ratione sapiente voluptas voluptatem voluptates.',
    },
    {
      id: 3,
      title: 'Title 3',
      content: 'Tab content 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores consequatur error, in iusto laboriosam laborum laudantium molestiae natus obcaecati porro praesentium quaerat quidem quo ratione sapiente voluptas voluptatem voluptates.',
    },
    {
      id: 4,
      title: 'Title 4',
      content: 'Tab content 4 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores consequatur error, in iusto laboriosam laborum laudantium molestiae natus obcaecati porro praesentium quaerat quidem quo ratione sapiente voluptas voluptatem voluptates.',
    },
    {
      id: 5,
      title: 'Title 5',
      content: 'Tab content 5 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores consequatur error, in iusto laboriosam laborum laudantium molestiae natus obcaecati porro praesentium quaerat quidem quo ratione sapiente voluptas voluptatem voluptates.',
    },
    {
      id: 6,
      title: 'Title 6',
      content: 'Tab content 6 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores consequatur error, in iusto laboriosam laborum laudantium molestiae natus obcaecati porro praesentium quaerat quidem quo ratione sapiente voluptas voluptatem voluptates.',
    },
  ];
  tabItems: Array<TabItem> = [];
  selectedTab!: TabItem | null;
  activeTabId!: number;

  destroyed = new Subject<void>();
  currentScreenSize?: string;
  smallDeviceKeyString = 'XSmall';
  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }

  ngOnInit(): void {
    this.tabItems = [...this.allTabItems];
    this.activeTabId = this.tabItems[0]?.id - 1;
    this.selectTabItemByIndex(this.activeTabId);
  }

  selectTabItemByIndex(tabIndex: number) {
    if(tabIndex === -1) {
      this.selectedTab = null;
      return;  
    }

    this.selectedTab = this.tabItems[tabIndex];
    this.activeTabId = tabIndex;
  }

  getTabIndexById(tabId: number) {
    return this.tabItems.findIndex(tab => tab.id === tabId);
  }

  tabClickHandler(tabItem: TabItem) {
    this.selectTabItemByIndex(this.getTabIndexById(tabItem.id));
  }

  trackByItemId(index: number, item: TabItem) {
    return item.id;
  }

  goToPreviousTab() {
    this.activeTabId = (this.activeTabId > 0) ? (this.activeTabId - 1) : 0;
    this.selectTabItemByIndex(this.activeTabId);
  }

  goToNextTab() {
    this.activeTabId = (this.activeTabId < this.tabItems.length) ? (this.activeTabId + 1) : (this.tabItems.length - 1);
    this.selectTabItemByIndex(this.activeTabId);
  }

  deleteTab(tabId: number) {
    const tabIndex = this.getTabIndexById(tabId);
    if(tabIndex === this.tabItems.length - 1) { // When deleting last tab
      // Making the first tab as active
      this.selectTabItemByIndex((this.tabItems.length - 1 === 0) ? -1 : 0);
    } else if(tabIndex < this.tabItems.length - 1) {
      this.selectTabItemByIndex(tabIndex + 1);  // Making the next tab as active
    } else {
      // When there is no tabs anymore empty the tab items and selected tab
      this.tabItems = [];
      this.selectTabItemByIndex(-1);
    }

    this.tabItems.splice(tabIndex, 1);
  }

  reset() {
    this.tabItems = [...this.allTabItems];
    this.selectTabItemByIndex(0);
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
