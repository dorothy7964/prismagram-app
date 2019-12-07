import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from 'expo-media-library';
import { Camera } from "expo-camera";
import { Ionicons } from '@expo/vector-icons';
import { Platform } from "@unimodules/core";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Button = styled.View`
    width: 70px;
    height: 70px;
    border-radius: 40px;
    border: 10px solid ${styles.lightGreyColor};
`;

export default ({ navigation }) => {
    const cameraRef = useRef();
    const [canTakePhoto, setCanTakePhoto] = useState(true);
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

    const takePhoto = async() => {
        if(!canTakePhoto){
            return;
        }

        try {
            setCanTakePhoto(false);
            const { uri } = await cameraRef.current.takePictureAsync({
                quality: 1
            });
            const asset = await MediaLibrary.createAssetAsync(uri);
            navigation.navigate("Upload", { photo: asset });
        } catch (e) {
            console.log(e);
            setCanTakePhoto(true);
        }
    };

    const askPermission = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if(status === "granted"){
                setHasPermission(true);
            }
        } catch(e) {
            console.log(e);
            setHasPermission(false);
        } finally {
            setLoading(false);
        }
    };

    const toggleType = () => {
        if (cameraType === Camera.Constants.Type.front){
            setCameraType(Camera.Constants.Type.back);  
        } else {
            setCameraType(Camera.Constants.Type.front);  
        }
    };
    
    useEffect(() => {
        askPermission();
    }, []);

    return (
        <View>
            {loading ? (
              <Loader />
            ) : hasPermission ? (
                <React.Fragment>
                    <Camera 
                        ref={cameraRef}
                        type={cameraType}
                        style={{
                            width:constants.width,
                            height:constants.height / 2,
                            justifyContent: "flex-end",
                            padding: 15
                        }}
                    >
                        <TouchableOpacity onPress={toggleType}>
                            <Ionicons 
                                name={Platform.OS === "ios" 
                                    ? "ios-reverse-camera" 
                                    : "md-reverse-camera"
                                } 
                                size={28} 
                                color={styles.blackColor}/>
                        </TouchableOpacity>
                    </Camera>
                    <View>
                        <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
                            <Button />
                        </TouchableOpacity>
                    </View>
                </React.Fragment>
            ) : null}
        </View>
    );
};