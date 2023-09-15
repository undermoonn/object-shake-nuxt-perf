### 🚧 Test Case

- The [test object]('./mock/vrsws.json') is a 6 deeps with each 6 properties object
- The [walker]('./walker.ts') reached 80% properties in each deep
- State was inject into document html with `useState`
- Runs on 14' M1 Pro

### SSR to Full load

#### Dev Mode

| origin | shake |
| ------ | ----- |
| 521ms  | 385ms |
| 509ms  | 353ms |
| 516ms  | 365ms |
| 517ms  | 380ms |
| 512ms  | 348ms |
| 504ms  | 382ms |
| 543ms  | 368ms |
| 499ms  | 370ms |
| 487ms  | 341ms |
| 548ms  | 362ms |

| origin avg | shake avg | improves |
| ---------- | --------- | -------- |
| 515.6ms    | 365.4ms   | 29.1%    |

### Prod Mode

#### TODO
