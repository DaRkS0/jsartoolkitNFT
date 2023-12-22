import { IImageObj } from "./CommonInterfaces";
export declare abstract class AbstractARControllerNFT {
    static initWithDimensions: (width: number, height: number, cameraParam: string) => Promise<AbstractARControllerNFT>;
    static initWithImage: (image: IImageObj, cameraParam: string) => Promise<AbstractARControllerNFT>;
    process: (image: IImageObj) => void;
    detectNFTMarker: (videoLuma: any) => void;
    trackNFTMarkerId: (id: number, markerWidth?: number) => object;
    getNFTMarker: (markerIndex: number) => object;
    getNFTData: (id: number, index: number) => object;
    addEventListener: (name: string, callback: object) => void;
    removeEventListener: (name: string, callback: object) => void;
    dispatchEvent: (event: {
        name: string;
        target: any;
        data?: object;
    }) => void;
    debugSetup: () => void;
    transMatToGLMat: (transMat: Float64Array, glMat: Float64Array, scale?: number) => Float64Array;
    arglCameraViewRHf: (glMatrix: Float64Array, glRhMatrix?: Float64Array, scale?: number) => Float64Array;
    getTransformationMatrix: () => Float64Array;
    getCameraMatrix: () => Float64Array;
    setDebugMode: (mode: boolean) => number;
    getDebugMode: () => boolean;
    getProcessingImage: () => number;
    setLogLevel: (mode: boolean) => number;
    getLogLevel: () => number;
    setProjectionNearPlane: (value: number) => void;
    getProjectionNearPlane: () => number;
    setProjectionFarPlane: (value: number) => void;
    getProjectionFarPlane: () => number;
    setThresholdMode: (mode: number) => number;
    getThresholdMode: () => number;
    setThreshold: (threshold: number) => number;
    getThreshold: () => number;
    loadNFTMarker: (urlOrData: string, onSuccess: (ids: number) => void, onError: (err: number) => void) => Promise<number[]>;
    loadNFTMarkers: (urlOrData: Array<string>, onSuccess: (ids: number[]) => void, onError: (err: number) => void) => Promise<number[]>;
    setImageProcMode: (mode: number) => number;
    getImageProcMode: () => number;
}
