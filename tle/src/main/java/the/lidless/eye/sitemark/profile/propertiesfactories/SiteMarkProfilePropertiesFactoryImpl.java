package the.lidless.eye.sitemark.profile.propertiesfactories;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import the.lidless.eye.sitemark.ResourcePaths;
import the.lidless.eye.sitemark.SiteMarkSubTypes;
import the.lidless.eye.sitemark.profile.SiteMarkProfile;
import the.lidless.eye.sitemark.profile.SiteMarkProfileFactory;
import the.lidless.eye.sitemark.profile.SiteMarkSubTypeProfile;
import the.lidless.eye.sitemark.prop.Props;
import the.lidless.eye.utils.PropertiesUtils;
import the.lidless.eye.utils.ReflectionUtils;

public class SiteMarkProfilePropertiesFactoryImpl implements SiteMarkProfileFactory {

	private SiteMarkSubTypeProfilePropertiesFactory subTypeFactory = new SiteMarkSubTypeProfilePropertiesFactory();
	
	private Set<String> allSubTypes = new HashSet<>();
	private Set<String> subTypes = new HashSet<>();
	
	private Map<String, SiteMarkSubTypeProfile> subTypeProfiles = new HashMap<>();

	public SiteMarkProfilePropertiesFactoryImpl() {
		fillAllSubTypes();
		fillSubTypes();
		fillAllSubTypeProfiles();
	}
	
	@Override
	public SiteMarkProfile createSiteMarkProfile() {

		SiteMarkProfile profile = new SiteMarkProfile();

		for (Entry<String, SiteMarkSubTypeProfile> curEntry : subTypeProfiles.entrySet()) {
			profile.getConstsToCut().addAll(curEntry.getValue().getConsts());
			profile.getFuncsToCut().addAll(curEntry.getValue().getFuncs());
		}
		
		for (String curSubType : subTypeProfiles.keySet()) {
			profile.getConstsToCut().removeAll(subTypeProfiles.get(curSubType).getConsts());
			profile.getFuncsToCut().removeAll(subTypeProfiles.get(curSubType).getFuncs());
		}
		
		//TODO add replacement tools
		
		
		return profile;
	}

	private void fillAllSubTypes() {
		allSubTypes.addAll(ReflectionUtils.getPublicStaticStringFieldValues(SiteMarkSubTypes.class));
	}
	
	private void fillSubTypes() {
		Properties siteMarkProperties = PropertiesUtils.loadProperties(ResourcePaths.SITE_MARK_PROPERTIES_PATH);
		for (String curSubType : allSubTypes) {
			String propName = Props.composeSubTypeProp(curSubType);
			String val = siteMarkProperties.getProperty(propName);
			if (val.equals(Boolean.valueOf(true).toString())) {
				subTypes.add(curSubType);
			}
		}
	}

	private void fillAllSubTypeProfiles() {
		for (String curSubType : allSubTypes) {
			subTypeProfiles.put(curSubType, subTypeFactory.createSiteMarkSubTypeProfile(curSubType));
		}
	}

}
