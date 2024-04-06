import {
  IonCol,
  IonContent,
  IonGrid,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
} from "@ionic/react";
import { add} from "ionicons/icons";
import { useState } from "react";
import { AddEvent } from "../components/AddEvent";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <IonContent className="ion-padding">
      <IonGrid>
        <IonCol size="6">
          <IonCard color={"dark"}>
            <IonCardHeader>
              <IonCardTitle>Card 1</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>Contenido de la Card 1</IonCardContent>
          </IonCard>
        </IonCol>
      </IonGrid>
      <IonFab slot="fixed" vertical="bottom" horizontal="end" color="warning">
        <IonFabButton>
          <IonIcon icon={add} onClick={() => setIsOpen(true)}></IonIcon>
        </IonFabButton>
      </IonFab>
      <AddEvent isOpen={isOpen} setIsOpen={setIsOpen} />
    </IonContent>
  );
};
