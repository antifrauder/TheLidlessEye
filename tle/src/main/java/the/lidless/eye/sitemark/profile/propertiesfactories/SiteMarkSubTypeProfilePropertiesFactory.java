package the.lidless.eye.sitemark.profile.propertiesfactories;

import java.util.Properties;

import the.lidless.eye.sitemark.ResourcePaths;
import the.lidless.eye.sitemark.profile.SiteMarkSubTypeProfile;
import the.lidless.eye.sitemark.prop.Props;
import the.lidless.eye.utils.PropertiesUtils;

public class SiteMarkSubTypeProfilePropertiesFactory {

	public SiteMarkSubTypeProfile createSiteMarkSubTypeProfile(String subType) {

		String propsPath = ResourcePaths.SITE_MARK_PROPERTIES_PATH + "/" + subType;
		Properties props = PropertiesUtils.loadProperties(propsPath);
		
		SiteMarkSubTypeProfile profile = new SiteMarkSubTypeProfile();

		String propPrefix = Props.composeSubTypeProp(subType);
		for (String curPropName : props.stringPropertyNames()) {
			if (!curPropName.startsWith(propPrefix))
				continue;
			if (Props.isConstProp(curPropName)) {
				profile.getConsts().add(props.getProperty(curPropName));
			} else if (Props.isFuncProp(curPropName)) {
				profile.getFuncs().add(props.getProperty(curPropName));
			}
		}
		
		return profile;
	}

}
