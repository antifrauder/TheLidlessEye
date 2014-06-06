package the.lidless.eye.sitemark.profile;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import the.lidless.eye.sitemark.SiteMarkSubTypes;
import the.lidless.eye.utils.ReflectionUtils;

public class SiteMarkProfilePropertiesFactoryImpl implements SiteMarkProfileFactory {

	public static final String SITE_MARK_PROPERTIES_PATH = "/the/lidless/eye/sitemark.properties";
	
	private Set<String> subTypes = new HashSet<>();

	@Override
	public SiteMarkProfile createSiteMarkProfile() {
		// TODO Auto-generated method stub
		return null;
	}

	private void composeSubTypes() {
		Set<String> allSubTypes = new HashSet<>();
		for (Object curSubTypeAsObject : ReflectionUtils.getPublicStaticFieldValues(SiteMarkSubTypes.class)) {
			allSubTypes.add((String) curSubTypeAsObject);
		}
		
		Properties siteMarkProperties = new Properties();
		InputStream propInputStream = getClass().getClassLoader().getResourceAsStream(SITE_MARK_PROPERTIES_PATH);
		try {
			siteMarkProperties.load(propInputStream);
		} catch (IOException e){
			//TODO !!!
			throw new RuntimeException("Cannot compose subtype list", e);
		} finally {
			try {
				propInputStream.close();
			} catch (IOException e) {
				//do nothing
			}
		}
		
		for (String curSubType : allSubTypes) {
			String val = siteMarkProperties.getProperty(curSubType);
			if (val.equals(Boolean.TRUE)) {
				subTypes.add(curSubType);
			}
		}
	}

}
