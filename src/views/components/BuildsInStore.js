import build1Image from '../../img/Build1.avif';
import build2Image from '../../img/Build2.avif';
import build3Image from '../../img/Build3.avif';

//TODO: change images
//all available builds in the store
export const builds = new Map();
builds.set(1, { id: "1", name: 'Player One', desc: "H5 Flow RTX 3050 Prebuilt Gaming PC", price: 3400.56, img: build1Image });
builds.set(2, { id: "2", name: 'Player Two', desc: "H5 Elite RTX 3070 Prebuilt Gaming PC", price: 4012.45, img: build2Image });
builds.set(3, { id: "3", name: 'Player Three', desc: "H7 Flow RTX 4070 Ti Prebuilt Gaming PC", price: 3201.37, img: build3Image });
builds.set(4, { id: "4", name: 'Player Four', desc: "H7 Flow RTX 4090 Ti Prebuilt Gaming PC", price: 3401.37, img: build3Image });
builds.set(5, { id: "5", name: 'Player Five', desc: "H7 Flow RTX 5020 Ti Prebuilt Gaming PC", price: 3723.37, img: build3Image });
builds.set(6, { id: "6", name: 'Player Six', desc: "H7 Flow RTX 5050 Ti Prebuilt Gaming PC", price: 4201.37, img: build3Image });
builds.set(7, { id: "7", name: 'Player Seven', desc: "H5 Elite RTX 2070 Prebuilt Gaming PC", price: 1201.43, img: build3Image });
builds.set(8, { id: "8", name: 'Player Eight', desc: "H5 Elite RTX 2050 Prebuilt Gaming PC", price: 1001.37, img: build3Image });
builds.set(9, { id: "9", name: 'Player Nine', desc: "H5 Elite RTX 2090 Prebuilt Gaming PC", price: 2201.75, img: build3Image });
builds.set(10, { id: "10", name: 'Player Ten', desc: "H5 Elite RTX 3010 Prebuilt Gaming PC", price: 2529.37, img: build3Image });
builds.set(11, { id: "11", name: 'Player Eleven', desc: "H5 Elite RTX 3030 Prebuilt Gaming PC", price: 3201.37, img: build3Image });

//call load all available builds in different pages
export function BuildsInStore() {
    return builds;
}

