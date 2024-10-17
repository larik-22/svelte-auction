# Testing

> Place your test plan, test report and traceability matrix here

## Traceability matrix

### Functional

The table below shows an overview of which test covers which functional requirements

| Test | F1 | F2 | F3 | F4 | F5 | F6 | F7 | F8 | F9 | F10 | 
|:----:|:--:|:--:| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  T1  | x  | x  | | | | | | | | |
|  T2  |    |    | | | | | | | | |
|  T3  |    |    | | | | | | | | |
|  T4  |    |    | | | | | | | | |


### Non funtional

The table below shows an overview of which test covers which non-functional requirements

| Test | NF1 | NF2 | NF3 | NF4 | NF5 | NF6 | NF7 | NF8 | NF9 | NF10 | NF11 | NF12 | NF13 | NF14 | NF15 | NF16 | NF17 | NF18 | NF19 | 
|:----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
|  T1  |     |     |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
|  T2  |     |     |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
|  T3  |     |     |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
|  T4  |     |     |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |

## Test plan
U: for un testable

### Prerequisites:
- Install dependencies both from client and server
- Run the server using `npm run dev`
- Run the client using `npm run dev`

### T1: View all auctions and a specific auction
1. Open the client in the browser (`http://localhost:5173/`)
2. Check if the list of auctionable products or services is displayed on the screen
3. Click on a `View Details` button on any auction
4. Check if the mandatory details (end date, bid list, product name, price) are displayed on the screen

## Test report

### T1: View all auctions and a specific auction
- The list of auctionable products or services is displayed on the screen on homepage
![img.png](assets/t1_step1.png)


- When clicking on a `View Details` button, the details of the auction are displayed
![img.png](assets/t1_step2.png)


- The mandatory details (end date, bid list, product name, price) are displayed on the screen
![img.png](assets/t1_step3.png)

