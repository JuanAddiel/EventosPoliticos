import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTextarea,
  IonImg,
  IonItemDivider,
  IonDatetime,
  IonToolbar,
  IonTitle,
} from "@ionic/react";



import { FC } from "react";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Storage } from "@ionic/storage";

export const AddEvent: FC<any> = ({ isOpen, setIsOpen }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [audio, setAudio] = useState("");
  const store = new Storage();


  const confirm = async () => {
    const eventData = {
      title,
      date,
      description,
      photo,
    };

    try {
      store.create();
      await store.set(
        "eventData",
        JSON.stringify(eventData),
      );
      console.log("Datos guardados exitosamente en el almacenamiento local.");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }

    setIsOpen(false);
  };

  const takePhoto = async () => {
    try {
      const capturedPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, // Utiliza la cámara para tomar la foto
      });
      setPhoto(capturedPhoto.webPath!);
    } catch (error) {
      console.error("Error al tomar la foto:", error);
    }
  };

  return (
    <>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>Add Event</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={confirm}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
              type="text"
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
            />
          </IonItem>
          <IonItem className="ion-padding-top">
            <IonDatetime
              value={date}
              onIonChange={(e) =>
                e.detail.value && setDate(e.detail.value.toString())
              }
            ></IonDatetime>
          </IonItem>
          <IonItem className="ion-padding-top">
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
            />
          </IonItem>
          <IonItem className="ion-padding-top">
            {photo !== "" && <IonImg src={photo} />}
            <IonButton onClick={takePhoto}>Take Photo</IonButton>
          </IonItem>
          <IonItem className="ion-padding-top">
            <audio controls src={audio} />
            <input
              type="file"
              accept="audio/*"
              onChange={(e) =>
                setAudio(URL.createObjectURL(e.target.files![0]))
              }
            />
          </IonItem>
        </IonContent>
      </IonModal>
    </>
  );
};
