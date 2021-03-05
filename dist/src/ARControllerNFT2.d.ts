interface ImageObj {
    videoWidth: null;
    width: null;
    videoHeight: null;
    height: null;
    data: null;
}
export default class ARControllerNFT {
    private options;
    private id;
    private width;
    private height;
    private image;
    private orientation;
    private cameraParam;
    private cameraId;
    private cameraLoaded;
    private artoolkitNFT;
    private listeners;
    private nftMarkers;
    private transform_mat;
    private marker_transform_mat;
    private transformGL_RH;
    private videoWidth;
    private videoHeight;
    private videoSize;
    private framepointer;
    private framesize;
    private dataHeap;
    private videoLuma;
    private camera_mat;
    private videoLumaPointer;
    private canvas;
    private ctx;
    private nftMarkerFound;
    private nftMarkerFoundTime;
    private nftMarkerCount;
    private _bwpointer;
    constructor(width: number, height: number, cameraParam: string, options: object);
    static initWithDimensions(width: number, height: number, cameraParam: string, options: object): Promise<ARControllerNFT>;
    static initNFTWithImage(image: ImageObj, cameraParam: string, options: object): Promise<ARControllerNFT>;
    getCameraMatrix(): object;
    _initialize(): Promise<this>;
}
export {};
