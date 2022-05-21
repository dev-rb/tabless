import { DynamicModule, Module } from '@nestjs/common';
import { Firestore, Settings } from 'firebase-admin/firestore';
import { FirestoreCollectionsProviders, FirestoreDatabaseProvider, FirestoreOptionsProvider } from './firestore.providers';

type FirestoreModuleOptions = {
    imports: any[],
    useFactoy: (...args: any[]) => Settings,
    inject: any[]
}

@Module({})
export class FirestoreModule {

    static forRoot(options: FirestoreModuleOptions): DynamicModule {

        const optionsProvider = {
            provide: FirestoreOptionsProvider,
            useFactory: options.useFactoy,
            inject: options.inject
        };

        const dbProvider = {
            provide: FirestoreDatabaseProvider,
            useFactory: (config) => new Firestore(config),
            inject: [FirestoreOptionsProvider]
        }

        const collectionProviders = FirestoreCollectionsProviders.map((val) => ({
            provide: val,
            useFactory: (db) => db.collection(val),
            inject: [FirestoreDatabaseProvider]
        }));

        return {
            module: FirestoreModule,
            imports: options.imports,
            providers: [optionsProvider, dbProvider, ...collectionProviders],
            exports: [dbProvider, ...collectionProviders],
            global: true
        }
    }
}
