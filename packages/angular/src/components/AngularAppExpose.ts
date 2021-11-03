import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./AppModule";

export default async () => {
    await platformBrowserDynamic().bootstrapModule(AppModule);
}