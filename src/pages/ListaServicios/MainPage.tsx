import { IconBreadcrumbs } from "./BreadChumbs";
import { BasicCard } from "./Card";
import ImportFile from "./ImportFiles";

export const MainPage = () => {
  return (
    <div className="principal-content" id="principal-content">
      <div className="catalog-services">
        <IconBreadcrumbs />
        <div className="edition-iconsPaper">
        <h2 className="title-edit-catalog">EDICIÓN DE CATÁLOGO</h2>
        <ImportFile/>
        </div>
        <BasicCard />
      </div>
    </div>
  );
};
