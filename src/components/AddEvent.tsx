import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonTitle, IonToolbar } from "@ionic/react";

import { FC } from "react";

export const AddEvent:FC<any> = ({isOpen, setIsOpen})=>{

    return (
      <>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Welcome</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonInput
                label="Enter your name"
                labelPlacement="stacked"
                type="text"
                placeholder="Your name"
              />
            </IonItem>
          </IonContent>
        </IonModal>
      </>
    );
}