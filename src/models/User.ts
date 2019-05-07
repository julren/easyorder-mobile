export interface User {
  id?: string;
  firstname?: string;
  lastname?: string;
  creditCardInfo: {
    cardHolder: string;
    cardNumber: string;
    expires: string;
    verificationCode: string;
  };
}
