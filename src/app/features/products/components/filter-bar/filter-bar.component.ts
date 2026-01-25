import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent {

// Make these types intentionally nullable/optional only if you need ?? '' in template.
  @Input() query: string = '';                        // or: string | null | undefined
  @Input() category: string | null = null;
  @Input() minPrice: number | null = null;
  @Input() maxPrice: number | null = null;

  // ✅ Add this input
  @Input() categories: string[] = []; // default empty for safety

  @Output() queryChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string | null>();
  @Output() minPriceChange = new EventEmitter<number | null>();
  @Output() maxPriceChange = new EventEmitter<number | null>();

  // (Optional) Event handler methods if you want TS-typed handlers:
  onQueryInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.queryChange.emit(value);
  }
  onCategoryChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    this.categoryChange.emit(value || null);
  }
  onMinPriceInput(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    this.minPriceChange.emit(v === '' ? null : +v);
  }
  onMaxPriceInput(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    this.maxPriceChange.emit(v === '' ? null : +v);
  }


}
