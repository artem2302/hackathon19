import mongoose from "mongoose";

const Application = mongoose.model("Application");
const Company = mongoose.model("Company");

async function create(req, res) {
    const company = await Company.findById(req.body.company);
    if (!company) {
        return res.status(404)
            .json({
                error: true,
                message: "Company not found"
            });
    }
    company.ratingCount++;
    company.avgRating = (company.avgRating * (company.ratingCount - 1) + req.body.rating) / (company.ratingCount * 1.0);
    req.body.user = req.user._id;
    await company.save();
    let application = new Application(req.body);
    await application.save();
    return res.json({
        error: false,
        model: application
    });
}

async function update(req, res) {
    let application = await Application.findById(req.params.id);
    if (!application) {
        return res.status(404)
            .json({
                error: true,
                message: "Application not found"
            });
    }
    Object.keys(req.body).forEach(key => {
        application[key] = req.body[key];
    });
    await application.save();
    return res.json({
        error: false,
        model: application
    });
}

async function remove(req, res) {
    let application = await Application.findById(req.params.id);
    if (!application) {
        return res.status(404)
            .json({
                error: true,
                message: "Application not found"
            });
    }
    await application.remove();
    return res.json({
        error: false
    });
}

async function all(req, res) {
    const regex = new RegExp(`.*${req.query.description}.*`, "i");
    let applications = await Application.find(req.query.description ? { description: regex } : {});
    if (!applications || !applications.length) {
        return res.status(404)
            .json({
                error: true,
                message: "Applications not found"
            });
    }
    return res.json({
        error: false,
        model: applications
    });
}

async function load(req, res) {
    let application = await Application.findById(req.params.id);
    if (!application) {
        return res.status(404)
            .json({
                error: true,
                message: "Application not found"
            });
    }
    return res.json({
        error: false,
        model: application
    });
}

export default {
    create,
    update,
    remove,
    all,
    load
}