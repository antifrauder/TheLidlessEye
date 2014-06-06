package the.lidless.eye.sitemark.prop;

import the.lidless.eye.sitemark.TemplateElementType;

public class Props {

	public static final String SITEMARK_PROP_PREFIX = "sitemark";

	public static String composeSubTypeProp(String subType) {
		return SITEMARK_PROP_PREFIX + "." + subType;
	}
	
	public static boolean isConstProp(String prop) {
		return isActionProp(prop, TemplateElementType.CONST);
	}
	
	public static boolean isFuncProp(String prop) {
		return isActionProp(prop, TemplateElementType.FUNC);
	}
	
	private static boolean isActionProp(String prop, String action) {
		String[] propItems = prop.split(".");
		if (propItems.length < 3)
			return false;
		if (propItems[2].equals(action))
			return true;
		return false;
	}
	
}
