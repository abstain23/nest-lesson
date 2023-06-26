import { of, scan } from 'rxjs';

// of(1, 2, 3)
//   .pipe(map((x) => x * x))
//   .pipe(filter((x) => x % 2 !== 0))
//   .subscribe((v) => console.log('vv => ', v));

of(1, 2, 3)
  .pipe(
    scan((total, n) => {
      console.log('total', total);
      console.log('n', n);
      return total + n;
    }),
  )
  .subscribe((v) => console.log('vv => ', v));
