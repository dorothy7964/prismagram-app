import React, { useState, useEffect } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";

const View = styled.View`
    flex: 1;
`;

const Text = styled.Text``;

export default () => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [selected, setSelected] = useState();
    const [allPhotos, setAllPhotos] = useState();
    const changeSelected = photo => {
        setSelected(photo);
    };

    const getPhotos = async () => {
        try {
            const { assets } = await MediaLibrary.getAssetsAsync();
            const [firstPhoto] = assets;
            setSelected(firstPhoto);
            setAllPhotos(assets);
        } catch (e) {
             console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const askPermission = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if(status === "granted"){
                setHasPermission(true);
                getPhotos();
            }
        } catch(e) {
            console.log(e);
            setHasPermission(false);
        }
    };

    useEffect(() => {
        askPermission();
    }, []);

    retrun (
        <View>
            {loading? (
                <Loader />
            ) : (
                <View>
                    {hasPermission? (
                        <React.Fragment>
                            <Image
                                source={{ uri: selected.uri }}
                                style={{ width: constants.width, height: constants.height / 2 }}
                             />
                            <ScrollView
                                contentContainerStyle={{
                                    flexDirection: "row",
                                    flexWrap: "wrap"
                                }}
                            >
                                {allPhotos.map(photo => (
                                    <TouchableOpacity
                                        key={photo.id}
                                        onPress={() => changeSelected(photo)}
                                    >
                                        <Image
                                            source={{ uri: photo.uri }}
                                            style={{
                                                width: constants.width / 3,
                                                height: constants.height / 6,
                                                opacity: photo.id === selected.id ? 0.5 : 1
                                            }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </React.Fragment>
                ) : null}
                </View>
            )}
        </View>
    );
};