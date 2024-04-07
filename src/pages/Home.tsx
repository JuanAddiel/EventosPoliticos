import React, { useState, useEffect } from "react";
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
  IonImg,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { Storage } from "@ionic/storage";
import { AddEvent } from "../components/AddEvent";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [storedData, setStoredData] = useState<any>(null);
  const store = new Storage();

  useEffect(() => {
    const getDataFromStorage = async () => {
      try {
        await store.create();
        const result = await store.get("eventData");
        if (result) {
          // Verificar si result y result.value no son nulos
          const eventData = JSON.parse(result);
          setStoredData(eventData);
          console.log(eventData);
        }
      } catch (error) {
        console.error("Error al obtener los datos del storage:", error);
      }
    };
    if (isOpen === false) {
      getDataFromStorage();
    }
  }, [isOpen]); // La dependencia vacía [] asegura que el efecto se ejecute solo una vez al montar el componente

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
      {storedData && ( // Mostrar los datos almacenados solo si hay datos disponibles
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{storedData.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonImg src={storedData.photo} alt="Imagen" />

          </IonCardContent>
        </IonCard>
      )}
      <IonFab slot="fixed" vertical="bottom" horizontal="end" color="warning">
        <IonFabButton>
          <IonIcon icon={add} onClick={() => setIsOpen(true)}></IonIcon>
        </IonFabButton>
      </IonFab>
      <AddEvent isOpen={isOpen} setIsOpen={setIsOpen} />
    </IonContent>
  );
};
